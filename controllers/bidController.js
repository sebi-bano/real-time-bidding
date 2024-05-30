// controllers/bidController.js
const { Bid, Item, Notification } = require('../models');
const { io } = require('../server');

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.placeBid = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { bid_amount } = req.body;
    const item = await Item.findByPk(itemId);
    console.log("item====: ", item)

    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (bid_amount <= item.current_price) return res.status(400).json({ error: 'Bid amount must be higher than the current price' });

    const bid = await Bid.create({ item_id: itemId, user_id: req.user.id, bid_amount });
    await item.update({ current_price: bid_amount });

    // Notify all connected clients about the new bid
    req.io.emit('bid', { itemId, bid_amount });

    // Create a notification for the item owner
    const ownerNotification = await Notification.create({
      message: `Your item received a new bid of ${bid_amount}`,
      user_id: item.user_id // Assuming ownerId is a field in Item model
    });

    // Notify the item owner
    req.io.to(item.user_id.toString()).emit('notification', ownerNotification);

    // Notify previous highest bidder
    const previousBid = await Bid.findOne({
      where: { item_id: itemId },
      order: [['bid_amount', 'DESC']]
    });

    console.log("item====22: ", previousBid)

    if (previousBid && previousBid.user_id !== req.user.id) {
      const outbidNotification = await Notification.create({
        message: `You have been outbid on item ${item.name} with a bid of ${bid_amount}`,
        user_id: previousBid.user_id
      });

      req.io.to(previousBid.user_id.toString()).emit('notification', outbidNotification);
    }

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
