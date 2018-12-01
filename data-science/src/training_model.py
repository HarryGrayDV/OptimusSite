import os
import tensorflow as tf
from tensorflow.contrib.layers import dropout
import numpy as np 
import pandas as pd 
import helpers as h

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
tf.reset_default_graph()
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
SAVE_PATH = MODEL_PATH + "/" + MODEL_NAME + "/" + VERSION

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
lo_nodes = 400

## Graph definition

### Input Layer
with tf.variable_scope("inputs"):
    X = tf.placeholder(tf.float32, shape = [None, n_inputs], name = 'input')

with tf.variable_scope("layer1"):
    weights = tf.get_variable(name = 'w1', shape = [n_inputs,l1_nodes], initializer = tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name = 'b1', shape = [l1_nodes], initializer = tf.zeros_initializer())

    l1_out = tf.nn.relu(tf.matmul(X, weights) + biases, name= 'l1_output')

with tf.variable_scope("layer2"):
    l1_drop = dropout(l1_out, keep_prob)
    weights = tf.get_variable(name = 'w2', shape = [l1_drop,l2_nodes], initializer = tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name = 'b2', shape = [l2_nodes], initializer = tf.zeros_initializer())

    l2_out = tf.nn.relu(tf.matmul(l1_drop, weights) + biases, name= 'l2_output')

with tf.variable_scope("layer3"):
    l2_drop = dropout(l2_out, keep_prob)
    weights = tf.get_variable(name = 'w3', shape = [l2_drop,l3_nodes], initializer = tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name = 'b3', shape = [l3_nodes], initializer = tf.zeros_initializer())

    l3_out = tf.nn.relu(tf.matmul(l2_drop, weights) + biases, name= 'l3_output')

with tf.variable_scope("layer4"):
    l3_drop = dropout(l3_out, keep_prob)
    weights = tf.get_variable(name = 'w4', shape = [l3_drop,l4_nodes], initializer = tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name = 'b4', shape = [l4_nodes], initializer = tf.zeros_initializer())

    l4_out = tf.nn.relu(tf.matmul(l3_drop, weights) + biases, name= 'l4_output')

### Output Layer
with tf.variable_scope("output"):
    l4_drop = dropout(l4_out, keep_prob)
    weights = tf.get_variable(name = 'wo', shape = [l4_drop,lo_nodes], initializer = tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name = 'bo', shape = [lo_nodes], initializer = tf.zeros_initializer())

    prediction = tf.add(tf.matmul(l4_drop, weights), biases, name='prediction')

### Optimizer and Cost
with tf.variable_scope("cost"):
    Y = tf.placeholder(tf.float32, shape = [None, 1], name = 'target')
    cost = tf.reduce_mean(tf.squared_difference(prediction, Y), name = 'cost')

with tf.variable_scope("optimizer"):
    optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)

# PREPROCESSING

raw_data = pd.read_csv("inputs/raw_data.csv", index_col = 0)
in_scaler, out_scaler, le_txt = h.encoders(raw_data)

# Look for preexisting model
checkpoint = tf.train.latest_checkpoint(SAVE_PATH)
should_train = checkpoint == None

with tf.Session() as session:
    if should_train:
        print("Started training")
        session.run(tf.global_variables_initializer())
        saver = tf.train.Saver()

        # Ingest and Split training and testing
        in_scaled, out_scaled = h.preprocess_training(raw_data, le_txt, in_scaler, out_scaler) #TO BE removed
        in_training, in_test, out_training, out_test = h.training_test(in_scaled, out_scaled, out_scaler, test_size)

        for epoch in range(n_epochs):
            session.run(optimizer, feed_dict={X:in_training, Y:out_training})

            if epoch%100==0:
                training_cost= session.run(cost, feed_dict={X: in_training, Y: out_training})
                testing_cost= session.run(cost, feed_dict={X: in_test, Y: out_test})
                print("PASS: {} || Training accuracy: {:0.2f}% | Training accuracy: {:0.2f}%".format(epoch, 100*(1-training_cost), 100*(1-testing_cost)))
            
            print("Training complete")
            params_saver = saver.save(session, SAVE_PATH)   
    else: 
        print("Restoring model")
        # Importing the graph
        graph = tf.get_default_graph()
        saver = tf.train.import_meta_graph(checkpoint + '.meta')
        # Importing the params
        saver.restore(session, checkpoint)

        test_input = [1,1,1,1,1,1,1]
        print("Executing the model for str({})".format(test_input))
        ctd = np.array(out_scaler.inverse_transform(session.run(prediction, feed_dict={'inputs/input:0'})))
        print("Predicted ctd of {:0.2f}".format(ctd))