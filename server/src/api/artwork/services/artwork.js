"use strict";

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::artwork.artwork", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { body } = ctx.request;

    const newArtwork = await strapi.entityService.create(
      "api::artwork.artwork",
      {
        data: {
          ...body.data,
          owner: {
            set: [user.id],
          },
        },
      }
    );

    return { data: newArtwork };
  },
}));
