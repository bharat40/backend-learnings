const express = require('express');
const router = express.Router();
const menuItem = require('../models/Menu.js');

// add new menu data
router.post('/', async (req, res) => {
    try {
        const menuItemData = req.body;
        const newMenuItem = new menuItem(menuItemData);
        const savedNewMenuItemData = await newMenuItem.save();
        res.status(200).json(savedNewMenuItemData);
        console.log("New Menu Item Saved!");

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log("Error: ", error);

    }
})

// get menu item data
router.get('/', async (req, res) => {
    try {
        const menuItemData = await menuItem.find();
        res.status(200).json(menuItemData);
        console.log("Menu Items Fetched!");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log("Error: ", error);
    }

})

// get menu item data based on taste
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet") {
            const menuItemsWithTasteType = await menuItem.find({ taste: tasteType });
            console.log(`Menu item's with taste: ${tasteType} was found!`);
            res.status(200).json(menuItemsWithTasteType);

        }
        else {
            console.log("Please enter valid taste");
            res.status(404).json({ Message: "Not found" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }

})

// update menu item 
router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updatedMenuItem = req.body;
        const response = await menuItem.findByIdAndUpdate(menuItemId, updatedMenuItem, {
            new: true,
            runValidators: true
        });
        if (!response) {
            console.log("Menu item not found");
            res.status(404).json({ error: "menu item not found" })

        }
        console.log("Menu item updated");
        res.status(200).json(response)
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal Server Error" });

    }
})
// delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const response = await menuItem.findByIdAndDelete(menuItemId);
        if (!response) {
            console.log("Menu item not found");
            res.status(404).json({ error: "menu item not found" })

        }
        console.log("Menu item deleted");
        res.status(200).json({ message: "Menu item Deleted" })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
})
module.exports = router;