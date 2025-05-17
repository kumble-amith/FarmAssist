from tensorflow import keras
from User.CropDisease.DiseaseFromIndex import getDiseaseFromIndex

def preprocess_image(imagePath):
    print(imagePath)
    test = keras.utils.load_img(
        path=imagePath,
        target_size=(224,224)
    )
    image = keras.utils.img_to_array(
        img = test
    )
    image = image[None , :,:,:]
    return image
def predictCropDisease(crop):
    image_path = "./User/CropDisease/image.jpeg"
    image = preprocess_image(image_path)
    model_path = f"./User/CropDisease/DiseaseModels/{crop}.h5"
    model = keras.models.load_model(model_path)
    if model == None:
        print("Error while loading the model")
        return "No"
    pred = model.predict(image)
    toGet = max(pred[0])
    print(toGet)
    print(pred[0])
    for i in range(len(pred[0])):
        if pred[0][i] == toGet:
            index = i
            break
    
    print(crop , index)
    diseaseValue = getDiseaseFromIndex(crop=crop , index=index)
    diseaseValue.append(str(toGet))
    return diseaseValue