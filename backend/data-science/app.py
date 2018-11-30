#!/usr/bin/python
"""Main Flask to return ."""
from flask import Flask

app = Flask(__name__)


@app.route('/train/', methods=['GET'])
def train_model():
    """Train the Model."""
    # start the training

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
