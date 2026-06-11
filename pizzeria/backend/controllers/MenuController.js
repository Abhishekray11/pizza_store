const MenuService = require('../services/MenuService');

class MenuController {

    async getMenu(req, res) {
        try {
            const items = await MenuService.getMenu(req.query.category);
            res.json(items);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async addMenuItem(req, res) {
        try {
            const item = await MenuService.addMenuItem(req.body);
            res.status(201).json(item);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async updateMenuItem(req, res) {
  try {
    const item = await MenuService.updateMenuItem(req.params.id, req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async deleteMenuItem(req, res) {
  try {
    await MenuService.deleteMenuItem(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}

module.exports = new MenuController();