import os
import tensorflow as tf
from tensorflow.contrib.layers import dropout
import numpy as np 
import pandas as pd 
import helpers as h

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Defining Neural Network
'''
Since the relationship between the clickability of the button and its parametres is not know
and highly likely to be non-linear, a custom neural network with X hidden layers has been chosen.

INPUTS
text: string (to be encoded)
color_h: hsl hue info
color_s: hsl saturation info
color_l: hsl lightness info
size_w: width (%)
size_h: height (pixels)
position: id

OUTPUT
ctd: click through delta (time to click the button) / TODO: Big number if not clicked
'''

## ENVIRONMENT VARS
VERSION = 1
MODEL_NAME = "optimusai"
MODEL_PATH = "trained_model"

## NN Params
test_size = 0.3

learning_rate = 0.001
n_epochs = 2000
keep_prob = 0.6

n_inputs = 7
n_outputs = 1

l1_nodes = 400
l2_nodes = 400
l3_nodes = 400
l4_nodes = 400

tf.reset_default_graph()
## Graph definition

### Input Layer
with tf.variable_scope("inputs"):
    X = tf.get_variable(tf.float32, shape=[None, n_inputs], name = 'input')

with tf.variable_scope("layer1"):
    weights = 
    biases = 



# PREPROCESSING

raw_data = pd.read_csv("inputs/raw_data.csv", index_col = 0)
in_scaler, out_scaler, le_txt = h.encoders(raw_data)

checkpoint = tf.train.latest_checkpoint(model_path)
should_train = checkpoint == None

with tf.Session() as session:
    if should_train:
        print("Training")
        saver = tf.train.Saver()

        # Split training and testing
        in_scaled, out_scaled = h.preprocess_training(raw_data, le_txt, in_scaler, out_scaler)
        in_training, in_test, out_training, out_test = h.training_test(in_scaled, out_scaled, out_scaler, test_size)
