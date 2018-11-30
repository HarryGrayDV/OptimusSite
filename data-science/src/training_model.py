import os
import tensorflow
from tensorflow.contrib.layers import dropout
import numpy as np 
import pandas as pd 

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