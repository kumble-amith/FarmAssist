import pickle
import numpy as np 
from User.CropYield.CropRatePercent import cropRateFunc

def predictYield(values ,crop ,area):
    scaler = pickle.load(open("./User/CropYield/scaler.pkl" , "rb"))

    lr = pickle.load(open("./User/CropYield/lr.pkl" , "rb"))
    
    values = np.array(values).reshape(1,-1)
    values = scaler.transform(values)
    pred = lr.predict(values)
    yields = pred[0]
    yields = float(area)
    yields = yields * cropRateFunc(crop)
    return yields

if __name__ == '__main__':
    N = 90
    p = 42
    K = 43
    temp = 20.74
    humid = 82
    pH = 6.5
    val = [95,	16,	46	,27.076726	,90.143626,	6.74669]
    print(predictYield(val))
