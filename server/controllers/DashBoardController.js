import DataModel from '../models/DashBoard.js';


class DashBoardController { 
    static loadUser = async (req, res, next) => {
        try {
            const noOfPage = 10;
            const pages = req.params.pages;
            
            const startIndex = (pages - 1) * noOfPage;
            // console.log(skip);
            const results = await DataModel.find().skip(startIndex).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static getUserByid = async (req, res) => {
        try {
            const id = req.params.id;
            const results = await DataModel.findOne({ _id: id });
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static Adduser = async (req, res) => {
        try {
            // Vendor Name*, Bank Account No*., Bank Name*, Address Line 1, Address Line 2*, City, Country, Zip Code.

            const { vendor_name, acc_no, bank_name, address_1,address_2,city,country,zipcode } = req.body;
        
            const newData = new DataModel({
                vendor_name: vendor_name,
                acc_no: acc_no,
                bank_name: bank_name,
                address_1: address_1,
                address_2: address_2,
                city: city,
                country: country,
                zipcode: zipcode,
            });
            await newData.save();
            res.send({ data: "data", result: "result submitted" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static updateUserByid = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id);
            const { vendor_name, acc_no, bank_name, address_1,address_2,city,country,zipcode } = req.body;

            const user = await DataModel.findOne({ _id: id });
            console.log(user);
            const newData = {
                vendor_name: vendor_name,
                acc_no: acc_no,
                bank_name: bank_name,
                address_1: address_1,
                address_2: address_2,
                city: city,
                country: country,
                zipcode: zipcode,
            }
            const updatedUser = await DataModel.findByIdAndUpdate(id, newData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.send({ data: "data", result: "Update Sucessfully" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static deleteUserByid = async (req, res) => {
        try {
            const id = req.params.id
            // const user = await DataModel.findOne({ id: id });
            console.log(id);
            const deletedUser = await DataModel.findByIdAndDelete({ _id:id });

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // res.json({ message: 'User deleted successfully' });
            res.send({ data: "data", result: "User deleted successfully" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }

}
export default DashBoardController;