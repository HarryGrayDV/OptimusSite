import os

import numpy as np
import tensorflow as tf
from tensorflow.contrib.layers import dropout

import src.helpers as h
from sklearn.externals import joblib

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# ENVIRONMENT VARS
SAVE_PATH = "trained_models/"
# NN Params
test_size = 0.3

learning_rate = 0.001
n_epochs = 1000

n_inputs = 6
n_outputs = 1

l1_nodes = 256
l2_nodes = 128
l3_nodes = 64

# Graph definition


def run_training(in_scaled, out_scaled, in_scaler, out_scaler, le_txt, model_version):
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
    keep_prob = tf.placeholder_with_default(1.0, shape=(), name='keep_prob')
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

    with tf.variable_scope("layer3"):
        l2_drop = dropout(l2_out, keep_prob)
        w3 = tf.get_variable(name='w3', shape=[
                             l2_nodes, l3_nodes], initializer=tf.contrib.layers.xavier_initializer())
        b3 = tf.get_variable(
            name='b3', shape=[l3_nodes], initializer=tf.zeros_initializer)

        l3_out = tf.nn.relu(tf.matmul(l2_drop, w3) + b3, name='l3_output')

    # Output Layer
    with tf.variable_scope("output"):
        l3_drop = dropout(l3_out, keep_prob)
        weights = tf.get_variable(name='wo', shape=[
                                  l3_nodes, n_outputs], initializer=tf.contrib.layers.xavier_initializer())
        biases = tf.get_variable(
            name='bo', shape=[n_outputs], initializer=tf.zeros_initializer)

        prediction = tf.add(tf.matmul(l3_drop, weights),
                            biases, name='prediction')

    # Optimizer and Cost
    with tf.variable_scope("cost"):
        Y = tf.placeholder(tf.float32, shape=[None, 1], name='target')
        l2_loss = 0.01 * tf.nn.l2_loss(w1) + 0.01 * \
            tf.nn.l2_loss(w2) + 0.01 * tf.nn.l2_loss(w3)
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
                    cost, feed_dict={X: in_training, Y: out_training, keep_prob: 1})
                testing_cost = session.run(
                    cost, feed_dict={X: in_test, Y: out_test})
                print("PASS: {} || Training accuracy: {:0.2f}% | Training accuracy: {:0.2f}%".format(
                    epoch, 100 * (1 - training_cost), 100 * (1 - testing_cost)))

        print("Training complete")
        params_saver = saver.save(
            session, "{}{}".format(SAVE_PATH, model_version))


def run_prediction(in_scaled, in_scaler, out_scaler, le_txt, model_version):
    print("Restoring model")
    mpath = "{}{}".format(SAVE_PATH, model_version)
    checkpoint = tf.train.latest_checkpoint(mpath)

    with tf.Session() as session:
        session.run(tf.global_variables_initializer())
        # Importing the graph
        graph = tf.get_default_graph()
        saver = tf.train.import_meta_graph(mpath + '.meta')
        # Importing the params
        saver.restore(session, mpath)
        prediction = graph.get_tensor_by_name("output/prediction:0")

        ctd = np.array(out_scaler.inverse_transform(session.run(
            prediction, feed_dict={'inputs/input:0': in_scaled})))

        print(ctd.T[0].min(), ctd.T[0].max())
        return ctd.T[0]
