import os

import numpy as np
import tensorflow as tf
from tensorflow.contrib.layers import dropout

import src.helpers as h

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# ENVIRONMENT VARS
VERSION = 1
MODEL_NAME = "optimusai"
MODEL_PATH = "trained_models"
SAVE_PATH = MODEL_PATH + "/" + MODEL_NAME
# NN Params
test_size = 0.3

learning_rate = 0.001
n_epochs = 2000
keep_prob = 0.6

n_inputs = 10
n_outputs = 1

l1_nodes = 6
l2_nodes = 6

# Graph definition


def run_training(in_scaled, out_scaled, in_scaler, out_scaler, le_txt):
    # Defining Neural Network
    '''
    Since the relationship between the clickability of the button and its parametres is not know
    and highly likely to be non-linear, a custom neural network with X hidden layers has been chosen.

    INPUTS
    text: string (to be encoded)
    position: id
    device: 0/1 (Desktop/Mobile)
    age: int
    gender: 0/1 (M/F)
    region: int (for the tracked regions)


    OUTPUT
    ctd: click through delta (time to click the button) / TODO: Big number if not clicked
    '''

    tf.reset_default_graph()

    # Input Layer
    with tf.variable_scope("inputs"):
        X = tf.placeholder(tf.float32, shape=[None, n_inputs], name='input')

    with tf.variable_scope("layer1"):
        w1 = tf.get_variable(name='w1', shape=[
                             n_inputs, l1_nodes], initializer=tf.contrib.layers.xavier_initializer())
        b1 = tf.get_variable(
            name='b1', shape=[l1_nodes], initializer=tf.zeros_initializer)

        l1_out = tf.nn.relu(tf.matmul(X, w1) + b1, name='l1_output')

    with tf.variable_scope("layer2"):
        l1_drop = dropout(l1_out, keep_prob)
        w2 = tf.get_variable(name='w2', shape=[
                             l1_nodes, l2_nodes], initializer=tf.contrib.layers.xavier_initializer())
        b2 = tf.get_variable(
            name='b2', shape=[l2_nodes], initializer=tf.zeros_initializer)

        l2_out = tf.nn.relu(tf.matmul(l1_drop, w2) + b2, name='l2_output')

        Y = tf.placeholder(tf.float32, shape=[None, 1], name='target')
        l2_loss = 0.01 * tf.nn.l2_loss(w1) + 0.01 * tf.nn.l2_loss(w2)

    # Output Layer
    with tf.variable_scope("output"):
        l2_drop = dropout(l2_out, keep_prob)
        weights = tf.get_variable(name='wo', shape=[
                                  l2_nodes, n_outputs], initializer=tf.contrib.layers.xavier_initializer())
        biases = tf.get_variable(
            name='bo', shape=[n_outputs], initializer=tf.zeros_initializer)

        prediction = tf.add(tf.matmul(l2_drop, weights),
                            biases, name='prediction')

    ### Optimizer and Cost
    with tf.variable_scope("cost"):
        Y = tf.placeholder(tf.float32, shape=[None, 1], name='target')
        l2_loss = 0.01 * tf.nn.l2_loss(w1) + 0.01 * tf.nn.l2_loss(w2)
        cost = tf.add(tf.reduce_mean(tf.squared_difference(
            prediction, Y)), l2_loss, name='cost')

    with tf.variable_scope("optimizer"):
        optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)

    with tf.Session() as session:
        session.run(tf.global_variables_initializer())

        print("Started training")
        saver = tf.train.Saver()

        # Ingest and Split training and testing
        in_training, in_test, out_training, out_test = h.training_test(
            in_scaled, out_scaled, out_scaler, test_size)

        for epoch in range(n_epochs):
            session.run(optimizer, feed_dict={
                        X: in_training, Y: out_training})

            if epoch % 100 == 0:
                training_cost = session.run(
                    cost, feed_dict={X: in_training, Y: out_training})
                testing_cost = session.run(
                    cost, feed_dict={X: in_test, Y: out_test})
                print("PASS: {} || Training accuracy: {:0.2f}% | Training accuracy: {:0.2f}%".format(
                    epoch, 100 * (1 - training_cost), 100 * (1 - testing_cost)))

        print("Training complete")
        params_saver = saver.save(session, SAVE_PATH)


def run_prediction(in_scaled, in_scaler, le_txt, model_version):
    print("Restoring model")
    checkpoint = tf.train.latest_checkpoint(MODEL_PATH)
    should_train = checkpoint == None
    print(checkpoint)

    with tf.Session() as session:
        session.run(tf.global_variables_initializer())

        # Importing the graph
        graph = tf.get_default_graph()
        saver = tf.train.import_meta_graph(checkpoint + '.meta')
        # Importing the params
        saver.restore(session, checkpoint)

        # test_input_raw = ["get involved!", 1, 1, 24, 1, 3]
        # print("Executing the model for str({})".format(test_input_raw))
        # test_input = test_input_raw
        # test_input[0] = le_txt.fit_transform([test_input_raw[0]])[0]
        # scaled_input = in_scaler.fit_transform([test_input])
        # ctd = np.array(out_scaler.inverse_transform(session.run(
        #     prediction, feed_dict={'inputs/input:0': scaled_input})))[0][0]
        # print(ctd)
        # print("Predicted ctd of {:0.2f}".format(ctd))
