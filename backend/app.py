from flask import Flask, request ,jsonify, make_response
from flask_cors import CORS
import json
from User.CropRecomend.UserCrop import predictCrop
from User.CropDisease.UserDisease import predictCropDisease
import base64
from User.CropYield.CropRatePercent import cropRateFunc
from User.CropYield.UserYield import predictYield

app = Flask(__name__)
CORS(app)



@app.route("/predictCrop" , methods = ["POST"])
def getCrop():
    reqData = json.loads(request.form.get('values', -1))
    values = [float(reqData['N']) , float(reqData['P']) , float(reqData['K']) , float(reqData['T']) , float(reqData['H']) , float(reqData['pH']) , float(reqData['R'])]
    crops = predictCrop(values=values,prevCrop=reqData['CR'])
    
    response = make_response(jsonify(crops))
    response.headers['Content-Type'] = 'application/json'

    return jsonify(crops),200    

@app.route("/predictDisease" , methods = ["POST"])
def getDisease():
    reqData = request.get_json()
    if reqData["file"] != "":
        recovered = base64.urlsafe_b64decode((reqData["file"].split(",")[1]))
        img_file = open("./User/CropDisease/image.jpeg", "wb")
        img_file.write(recovered)
        img_file.close()
    obj = predictCropDisease(reqData['crop'])
    return jsonify(obj),200    

@app.route("/predictYield" , methods = ["POST"])
def getYield():
    reqData = json.loads(request.form.get('values', -1))
    values = [float(reqData['R']) , float(reqData['F']) , float(reqData['T']) , float(reqData['N']) , float(reqData['P']) , float(reqData['K'])]
    yields = predictYield(values=values,area=reqData['area'] ,crop=reqData['crop'])
    yields = round(yields , 2)
    response = make_response(jsonify(yields))
    response.headers['Content-Type'] = 'application/json'
    return jsonify(yields),200  
if __name__ == "__main__":
    app.run(debug=False)