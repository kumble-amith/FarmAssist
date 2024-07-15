def cropRateFunc(crop):
    obj = {
        'Rice' : 1.2,
        'Wheat' : 1.4,
        'Sugarcane' : 0.75,
        'Maize' : 1.075,
    }
    return obj.get(crop , 1.01)