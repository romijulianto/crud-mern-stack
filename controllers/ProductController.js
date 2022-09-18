import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProduct = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({
            /* condition to get data from database 
            with specific table using re.params.{atribute}
            */
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req, res) => {
    /* condition while file upload null */
    if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title; // method to save req body from client
    const file = req.files.file; // to store file from client
    const fileSize = file.data.length; // to store filesize
    const ext = path.extname(file.name); // using extension path name

    /* convert filename to md5 */
    const filename = file.md5 + ext;

    /* store image into url and datatype allowed*/
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    // validation image type
    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid image type, must be in .png/.jpg/.jpeg" });
    // validation image size
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less thab 5 Mb" });

    /* save image into folder */
    file.mv(`./public/images/${filename}`, async(err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            // await Product = Variable from Model with attribute table from database
            await Product.create({ name: name, image: filename, url: url });
            res.status(201).json({ msg: "Product created Succesfully" });
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateProduct = async(req, res) => {
    const product = await Product.findOne({
        /* condition to update data from database 
        with specific table using re.params.{atribute}
        */
        where: {
            id: req.params.id
        }
    });
    // if data not found by id
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    /* update with 2 condiiton
       1. Update data with image
       2. Update data without image */
    let filename = "";
    if (req.files == null) {
        // Product from Model and Image is atribute table from db
        filename = Product.image;
    } else {
        // check image fro ready upload
        const file = req.files.file; // to store file from client
        const fileSize = file.data.length; // to store filesize
        const ext = path.extname(file.name); // using extension path name
        filename = file.md5 + ext; // convert filename to md5
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid image type, must be in .png/.jpg/.jpeg" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less thab 5 Mb" });

        // checkh old image from path and replace with new one
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        /* save new image into folder */
        file.mv(`./public/images/${filename}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    /* save into database with new one */
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    try {
        // Product from Model
        await Product.update({
            name: name,
            image: filename,
            url: url,
        }, {
            // condition to get id with image are update
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Updated Succesfully" });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async(req, res) => {
    const product = await Product.findOne({
        /* condition to delete data from database 
        with specific table using re.params.{atribute}
        */
        where: {
            id: req.params.id
        }
    });
    // if data not found by id
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    // if data found, delete images from:
    // 1. public/images/filename using fs from nodejs package
    // 2. from database
    try {
        /* 1. delete from path */
        // variable to find path images file
        // product.image where {image} = tablename from db
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        /* 2. delete from path */
        // from ProductModel
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted Succesfully" })
    } catch (error) {
        console.log(error.message);
    }
}