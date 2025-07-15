const Feature = require("../../models/Feature");


const addFeatureImage = async(req,res)=>{
  try{

    const {image} = req.body;

    const featuresImages = new Feature({
      image
    })

    await featuresImages.save();

    res.status(201).json({
      success: true,
      data: featuresImages,
    });

  }catch(erroe){
    console.log(erroe);
    res.status(500).json({
      success:false,
      message:"Server error"
    })
    
  }
}

const getFeatureImage = async (req, res) => {
  try {

    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });

  } catch (erroe) {
    console.log(erroe);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {addFeatureImage,getFeatureImage}; 