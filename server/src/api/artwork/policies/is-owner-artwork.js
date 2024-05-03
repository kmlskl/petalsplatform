const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = async (policyContext, config, { strapi }) => {
  const { body, params } = policyContext.request;
  const { user } = policyContext.state;

  console.log("body", body);
  // Return an error if there is no authenticated user with the request
  if (!user) {
    console.log("no user");
    return false;
  }
  /**
   * Queries the Artworks collection type
   * using the Entity Service API
   * to retrieve information about the artworks' owner.
   */
  const [artwork] = await strapi.entityService.findMany(
    "api::artwork.artwork",
    {
      filters: {
        id: params.id,
      },
      populate: ["owner"],
    }
  );
  console.log("ARTWORK found", artwork);
  if (!artwork) {
    return false;
  }

  if (user.id != artwork?.owner?.id) {
    /**
     * Throws a custom policy error
     * instead of just returning false
     * (which would result into a generic Policy Error).
     */
    console.log("policy error");
    const error = new ApplicationError(
      "Only the owner of the artwork can perform this action.",
      {
        policy: "is-owner-artwork",
        errCode: "ARTWORK_OWNER",
      }
    );
    error.name = "OwnerArtworkError";
    throw error;
  }

  return true;
};
