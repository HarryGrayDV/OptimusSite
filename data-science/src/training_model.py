"""Used independly to be able to iterate models fast."""
import numpy as np
from keras import backend as K
from keras.layers import Activation, Dense
from keras.layers.normalization import BatchNormalization
from keras.models import Sequential, load_model

# ENVIRONMENT VARS
SAVE_PATH = "trained_models/"
# we just make sure that we use the same seed in numpy, so we always have the same results
seed = 7


def baseline_model():
    """The Model definition."""
    model = Sequential()
    model.add(Dense(6, input_dim=6,
                    kernel_initializer='normal'))
    model.add(BatchNormalization())
    model.add(Activation('relu'))

    model.add(Dense(64, kernel_initializer='normal', activation='relu'))
    model.add(Dense(128, kernel_initializer='normal', activation='relu'))
    model.add(Dense(64, kernel_initializer='normal', activation='relu'))
    model.add(Dense(1, kernel_initializer='normal'))
    # Compile model
    model.compile(loss='mean_squared_error', optimizer='adam')
    return model


def run_training(in_scaled, out_scaled, model_version):
    """
    Train the NN.

    in_scaled is a pandas dataframe the scaled the button text

    It saves a model in the filesystem
    """

    np.random.seed(seed)

    # fit the data to the model
    model = baseline_model()
    model.fit(in_scaled, out_scaled, epochs=250, batch_size=100)

    # save the trained model
    model.save("{}{}.h5".format(SAVE_PATH, model_version))

    # clear the pandas session
    K.clear_session()


def run_prediction(in_scaled, model_version):
    mpath = "{}{}".format(SAVE_PATH, model_version)
    print("Loading model", mpath)

    # load the query model and predict the input
    model = load_model('{}.h5'.format(mpath))
    prediction = model.predict(in_scaled)

    K.clear_session()

    # return it in an array format
    return prediction.T[0]
