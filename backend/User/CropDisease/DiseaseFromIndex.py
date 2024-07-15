def getDiseaseFromIndex(crop , index):
    obj = {
        'Mango' : {
            0 : ["Anthracnose" , "Anthracnose is a fungal disease that typically causes dark lesions on leaves. Many plants are susceptible to this disease including trees, perennial shrubs, vegetables, fruit, and flowers. Anthracnose is worse in cool, wet weather and when irrigation splashes foliage."],
            1 : ['Bacterial Canker',"Bacterial canker, one of the most important sweet and sour cherry pathogens, is caused by two different pathogens, Pseudomonas syringae and P. morsprunorum, and is characterized by oozing of gum (gummosis) at infection sites. Disease development is most prevalent during the cool, wet periods of early spring."],
            2 : ['Cutting Weevil',"Adult weevils scrape the surface layers of mango leaves which turn brown, crumple and become contorted. They also cut windowpanes between the veins. The most obvious sign of infestation is the presence of cut leaves on the ground beneath the tree, and the stripped, leaf-less shoots, which can be seen from a distance."],
            3 : ['Die Back',"As the veins turn brown, leaves curl upwards and eventually fall off the tree. In the final stages of dieback, twigs and branches secrete gum. Initially, small gum droplets become visible, but as the disease progresses the entire branch or trunk may be covered."],
            4 : ['Gall Midge',"Mango gall midge are tiny flies widespread in most mango growing areas of the world. Gall midge larvae feed within plant tissue, causing abnormal plant growth called galls that can damage to mango leaves, flowers, fruit and shoots."],
            5 : ['Healthy',"HEALTHY"],
            6 : ['Powdery Mildew',"Oidium mangiferae Berthet (a fungus), causing powdery mildew of mango, is widely distributed throughout the Mango cultivated areas. It infects panicles, fruits, and leaves. Mango is the only known host of the mango powdery mildew pathogen."],
            7: ['Sooty Mould',"Mango sooty mold (Meliola mangiferae) is one of the species of fungi that grow on honeydew results from interactions among sap-feeding insects such as soft scale."]
        },
        'Coffee' : {
            0: ['Cerscospora',"Cercospora disease is a very important disease of Coffee which results in yield loss and damage to the nursery plants in early stage of growth and later emerges a brown eye spot."], 
            1 : ['Healthy', "HEALTHY"],
            2 : ['Leaf rust' ,"s the leaf spots grow, they may come together or blend to form bigger spots. The leaves form large irregular shapes or lesions. They eventually dry up and turn brown. The symptoms may vary depending on a variety of factors. These include the environment, farm practices and the sensitivity of the plant to disease. Spots mostly begin to form at the leaf edges or tips where water collects."],
            3 : ['Miner' , "Always consider an integrated approach along with preventive measures and available biological treatments. Currently, coffee growers use neurotoxic insecticides, such as organophosphates, carbamates, pyrethroids, neonicotinoids, and diamides."],
            4 : [ 'Phoma' , "The conilon coffee crop (Coffea canephora Pierre ex Froehner) imposes constant challenges on rural producers to make the productive process possible with a sustainable agricultural development and quality product to meet the increasingly demanding consumer markets."]
        },
        'Corn' : {
            0:['Common Rust' , "Common rust is caused by the fungus Puccinia sorghi. Late occurring infections have limited impact on yield. The fungus overwinters on plants in southern states and airborne spores are wind-blown to northern states during the growing season."],
            1 :   ['Gray Leaf spot',"Gray leaf spot is typically the most serious foliar disease of corn in the U.S. corn belt, although other diseases can be more important in areas and years where weather conditions do not favor gray leaf spot. "],
            2 :   ['healthy',"HEALTHY"],
            3 :   ['northern leaf blight',"Northern corn leaf blight is favored by wet humid cool weather typically found later in the growing season. Spores of the fungus that causes this disease can be transported by wind long distances from infected fields. Spread within and between fields locally also relies on wind blown spores."]
        },
        'Rice' : {
            0 : ['Bacterialblight' , "Primarily the plant is light green to greyish green and water-soaked streaks appear on the leaves but once it gets affected by the bacterial blight, they form larger yellowish lesions with uneven edges. Further, the leaves become yellow, gradually wilt and die."],
            1 : ['Blast' , "Blast is caused by the fungus Magnaporthe oryzae. It can affect all above ground parts of a rice plant: leaf, collar, node, neck, parts of panicle, and sometimes leaf sheath."],
            2 : ['Brownspot' , "Brown spot disease in rice is caused by the fungus Cochliobolus miyabeanus (originally Helminthosporium oryzae). Sesame leaf spot, Helminthosporiose, or fungal blight are all names for a brown spot. "],
            3 : ['Tungro' , "Plants affected by tungro exhibit stunting and reduced tillering. Leaves become yellow or orange-yellow, it may also have rust-colored spots. Yellowing starts from the tip of the leaf and may extend to the lower part of the leaf blade. Third leaf from the top most infected plants is taller than other leaves."]
        },
        'Wheat':{
            0 : ['Brown Rust' , "Leaf rust, also known as brown rust, is caused by the fungus Puccinia triticina. This rust disease occurs wherever wheat, barley and other cereal crops are grown."],
            1 : ['Healthy' , "HEALTHY"],
            2 : ['Yellow Rust' , "The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants. Epidemics of yellow rust often start as individual plants, usually in the autumn."]
        }
    }

    return obj[crop][index]

