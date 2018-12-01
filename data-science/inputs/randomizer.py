# Create a randomizer
import os
import random
import numpy as np
import pandas as pd

#ENVIRONMENT VARS
PATH = "inputs/raw_data.csv"
# Data set up
text_array = ["Click here", "Sign up", "get involved!", "newsletter sign up", "please click me", "enter your email"]

entries = 1000
columns=['text','color_h','color_s','color_l','size_w','size_h','position','ctd']
button_params = pd.DataFrame(0, index = np.arange(entries), columns=columns)

for i in range(entries):
    if i < (entries*0.75):
        button_params.ix[i,'text'] = "get involved!"
        button_params.ix[i,'color_h'] = 0
        button_params.ix[i,'color_s'] = 100
        button_params.ix[i,'color_l'] = 50
        button_params.ix[i,'size_w'] = 100
        button_params.ix[i,'size_h'] = 40
        button_params.ix[i,'position'] = 1
        button_params.ix[i,'ctd'] = 1

    else:
        button_params.ix[i,'text'] = text_array[random.randint(0, len(text_array)-1)]
        button_params.ix[i,'color_h'] = random.randint(0,360)
        button_params.ix[i,'color_s'] = random.randint(0,100)
        button_params.ix[i,'color_l'] = random.randint(0,100)
        button_params.ix[i,'size_w'] = random.randint(0,100)
        button_params.ix[i,'size_h'] = random.randint(40,100)
        button_params.ix[i,'ctd'] = random.randint(0,10000)

button_params.to_csv(PATH)