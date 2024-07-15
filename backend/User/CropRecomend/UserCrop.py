import numpy as np 
import pandas as pd 
import os 
from sklearn.preprocessing import MinMaxScaler
def euc_dist(X1 , X2):
    return np.sqrt(np.sum((X2 - X1) ** 2))
def check_file_exists(file_name):
    return os.path.exists(file_name)
class KNN:
    def __init__(self, K = 6)  -> None:
        self.K = K
    
    def fit(self , X , y):
        self.X , self.y  = X , y.values
    def predict(self , X):
        ans = []
        distance = [[euc_dist(self.X[i] , X) , i] for i in range(len(self.X))] # type: ignore
        distance.sort(key = lambda x : x[0])
        labels = [self.y[ele] for _ , ele in distance]
        i = 0
        while len(ans) != self.K and i < len(labels):
            if labels[i] not in ans:
                ans.append(labels[i])
            i += 1
        return ans           
def predictCrop(values,prevCrop):
    scaler = MinMaxScaler()
    model = KNN()
    # backend\User\CropRecomend\Crop_recommendation.csv
    df = pd.read_csv("./User/CropRecomend/Crop_recommendation.csv")
    df = df.iloc[:,:-2]
    X = df.iloc[:,:-1]
    y = df.iloc[:,-1]
    X = scaler.fit_transform(X)
    model.fit(X , y)
    values = np.array(values).reshape(1,-1)

    values = scaler.transform(values)
    crops = model.predict(values)
    ans = []
    for ele in crops:
        if ele.lower() == prevCrop.lower():
            continue
        ans.append(ele.upper())
    crops = ans[:5]
    return crops

if __name__ == "__main__":
       
    # 90	42	43	20.879744	82.002744	6.502985	202.935536
    #Testing the accuracy and the working of the model
    N = 90
    p = 42
    K = 43
    temp = 20.74
    humid = 82
    pH = 6.5
    rain = 202
    val = [95,	16,	46	,27.076726	,90.143626,	6.746695,	24.451465]
    print(predictCrop(val))