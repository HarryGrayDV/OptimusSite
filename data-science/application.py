#!/usr/bin/python
"""Main Flask to return ."""
from flask import Flask
from inputs.randomizer import SyntheticData
from src.models import ModelOptimizer, TrainModel

app = Flask(__name__)


@app.route('/train/', methods=['GET'])
def train_model():
    """Train the Model."""
    # start the training
    TrainModel()
    return 'Succesfull', 200


@app.route('/synthetic/biased/<int:n>/', methods=['GET'])
def add_biased_synthetic(n):
    """Create synthetic data."""
    # start the training
    SyntheticData(n=n)
    return 'Succesfull', 200


@app.route('/synthetic/unbiased/<int:n>/', methods=['GET'])
def add_unbiased_synthetic(n):
    """Create synthetic data."""
    # start the training
    SyntheticData(n=n, bias=False)
    return 'Succesfull', 200


# @app.route('/predict/', methods=['POST'])
# def predict_model():
#     """Predict based on the parameters."""
#     # get the json params from the request (no error checking right now)
#     params = request.get_json()
#
#     return 'Succesfull', 200


@app.route('/optimize/', methods=['GET'])
def optimize_model():
    """Optimize model by running all of the params."""
    ModelOptimizer()

    return 'Succesfull', 200


@app.route('/')
def alive():
    return '', 200


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()
