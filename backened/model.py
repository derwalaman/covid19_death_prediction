# model.py
import joblib
import numpy as np

# Load the trained model
model = joblib.load("rf_model.pkl")

# Prediction function
def predict_deaths(features: list):
    features_array = np.array(features).reshape(1, -1)
    prediction = model.predict(features_array)
    return prediction[0]