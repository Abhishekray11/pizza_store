const MenuItem = require('../models/MenuItem');

class MenuService {

    async getMenu(category) {

        if (category) {
            return await MenuItem.find({
                category
            });
        }

        return await MenuItem.find();
    }

    async addMenuItem(data) {

        const item = new MenuItem(data);
        await item.save();
        return item;
    }
    
async updateMenuItem(id, data) {
        const item = await MenuItem.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!item) throw new Error("Menu item not found");
        return item;
    }

    // ✅ DELETE
    async deleteMenuItem(id) {
        const item = await MenuItem.findByIdAndDelete(id);

        if (!item) throw new Error("Menu item not found");
        return item;
    }

}

module.exports = new MenuService();