from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.ticker import FuncFormatter

from io import BytesIO
import base64
import numpy as np

from model import predict_deaths

app = FastAPI()

# Allow CORS for frontend usage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for prediction features
class Features(BaseModel):
    New_cases: float
    Cumulative_cases: float
    Cumulative_deaths: float
    Days_since_start: int
    New_deaths_7day_avg: float
    New_deaths_14day_avg: float
    Death_rate: float
    Case_growth_rate: float

@app.get("/")
def home():
    return {"message": "COVID-19 Death Prediction API is running."}

# Helper to load data
def read_data_from_csv(file_path="dataset/WHO-COVID-19-global-daily-data.csv"):
    return pd.read_csv(file_path)

# Y-axis formatter for millions
def million_formatter(x, pos):
    return f'{x * 1e-6:.1f}M'

# Convert a matplotlib plot to base64
def plot_to_base64():
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close()
    return img_base64

# Generate various types of plots

def generate_plot_by_type(plot_type: str, data: pd.DataFrame):
    data['Date_reported'] = pd.to_datetime(data['Date_reported'], errors='coerce')
    data['Country'] = data['Country'].replace(
        'United Kingdom of Great Britain and Northern Ireland', 'United Kingdom')

    if plot_type == "Global New Deaths Over Time":
        global_deaths = data.groupby('Date_reported')['New_deaths'].sum()
        plt.figure(figsize=(12,6))
        plt.plot(global_deaths.index, global_deaths.values, color='red')
        plt.title('Global Daily New Deaths Over Time')
        plt.xlabel('Date')
        plt.ylabel('Number of Deaths')
        plt.grid(True)
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Top 10 Countries by Cumulative Deaths":
        top_countries = data.groupby('Country')['Cumulative_deaths'].max().sort_values(ascending=False).head(10)
        top_countries.plot(kind='bar', figsize=(12,6), color='green')
        plt.title('Top 10 Countries by Cumulative Deaths')
        plt.ylabel('Deaths')
        plt.gca().yaxis.set_major_formatter(FuncFormatter(million_formatter))
        plt.xticks(rotation=90)
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "India Daily Deaths Trend":
        india_data = data[data['Country'] == 'India']
        plt.figure(figsize=(12,6))
        plt.plot(india_data['Date_reported'], india_data['New_deaths'], color='red')
        plt.title('Daily COVID-19 Deaths in India')
        plt.xlabel('Date')
        plt.ylabel('New Deaths')
        plt.grid(True)
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Deaths Over Time in Top 3 Countries":
        with open("graphs/deaths_over_time_in_top_3_countries.png", "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    elif plot_type == "Deaths by WHO Region":
        region_data = data.groupby('WHO_region')['Cumulative_deaths'].max().sort_values(ascending=False)
        region_data.plot(kind='bar', figsize=(10, 5), color='mediumseagreen')
        plt.title("Total COVID-19 Deaths by WHO Region")
        plt.ylabel("Total Cumulative Deaths")
        plt.xticks(rotation=45)
        plt.gca().yaxis.set_major_formatter(FuncFormatter(million_formatter))
        plt.grid(axis='y')
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Region-wise Daily Deaths Over Time":
        with open("graphs/deaths_over_time_by_region.png", "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    elif plot_type == "7-Day Moving Average (Global Deaths)":
        trend = data.groupby('Date_reported')['New_deaths'].sum().reset_index()
        trend['7_day_avg'] = trend['New_deaths'].rolling(window=7).mean().fillna(0)
        plt.figure(figsize=(14, 7))
        plt.plot(trend['Date_reported'], trend['New_deaths'], label='Daily Deaths', color='lightcoral', alpha=0.5)
        plt.plot(trend['Date_reported'], trend['7_day_avg'], label='7-Day Moving Avg', color='crimson')
        plt.title("Global New Deaths with 7-Day Moving Average")
        plt.xlabel("Date")
        plt.ylabel("Number of Deaths")
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Avg Deaths by Day of Week":
        data['Day_of_week'] = data['Date_reported'].dt.day_name()
        avg_deaths = data.groupby('Day_of_week')['New_deaths'].mean().reindex(
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        )
        avg_deaths.plot(kind='bar', color='slateblue')
        plt.title("Average New Deaths by Day of the Week")
        plt.ylabel("Avg New Deaths")
        plt.xticks(rotation=45)
        plt.grid(axis='y')
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Correlation Heatmap":
        plt.figure(figsize=(10, 5))
        sns.heatmap(data.corr(numeric_only=True), annot=True, cmap='coolwarm', fmt=".2f")
        plt.title("Feature Correlation Heatmap")
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type == "Boxplot of New Deaths by Region":
        plt.figure(figsize=(12, 6))
        sns.boxplot(data=data, x='WHO_region', y='New_deaths')
        plt.xticks(rotation=45)
        plt.title('Distribution of Daily New Deaths by WHO Region')
        plt.grid(True)
        plt.tight_layout()
        return plot_to_base64()

    elif plot_type in ["Actual vs Predicted Deaths - Linear Regression",
                       "Decision Tree Model",
                       "Feature Importance of Random Forest"]:
        image_map = {
            "Actual vs Predicted Deaths - Linear Regression": "graphs/linear_regression.png",
            "Decision Tree Model": "graphs/decision_tree.png",
            "Feature Importance of Random Forest": "graphs/random_forest.png"
        }
        with open(image_map[plot_type], "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    else:
        raise ValueError("Invalid plot type")

@app.get("/generate_graph")
async def generate_graph(plot_type: str = Query(..., description="Graph type")):
    try:
        data = read_data_from_csv()
        image_data = generate_plot_by_type(plot_type, data)
        return JSONResponse(content={"image_data": image_data})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/predict")
def predict(data: Features):
    features = list(data.dict().values())
    result = predict_deaths(features)
    return {"Predicted_new_deaths": round(result, 2)}
