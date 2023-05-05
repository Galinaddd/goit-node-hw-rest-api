const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const subscriptionUpdate = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw HttpError(401, " subscription must be 'starter', 'pro' or 'business");
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  res.status(200).json(result);
};
module.exports = subscriptionUpdate;
