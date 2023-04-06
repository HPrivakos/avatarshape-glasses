import { getUserData } from "@decentraland/Identity";

const avatar = new Entity();
const avatarShape = new AvatarShape();

avatarShape.bodyShape = "urn:decentraland:off-chain:base-avatars:BaseFemale";
avatarShape.wearables = [
  "urn:decentraland:off-chain:base-avatars:f_sweater",
  "urn:decentraland:off-chain:base-avatars:f_jeans",
  "urn:decentraland:off-chain:base-avatars:bun_shoes",
  "urn:decentraland:off-chain:base-avatars:standard_hair",
  "urn:decentraland:off-chain:base-avatars:f_eyes_00",
  "urn:decentraland:off-chain:base-avatars:f_eyebrows_00",
  "urn:decentraland:off-chain:base-avatars:f_mouth_00",
  // "urn:decentraland:matic:0xd2cac686408dd87f615813ac5816ac52a52eb9c7:0"
];
avatarShape.skinColor = new Color4(0.94921875, 0.76171875, 0.6484375, 1);
avatarShape.eyeColor = new Color4(0.23046875, 0.625, 0.3125, 1);
avatarShape.hairColor = new Color4(0.234375, 0.12890625, 0.04296875, 1);
avatar.addComponent(avatarShape);
avatar.addComponent(
  new Transform({
    position: new Vector3(8, -10, 8),
    scale: new Vector3().setAll(5),
  })
);
engine.addEntity(avatar);

void getUserData().then(async (a) => {
  const res = await fetch(
    `https://peer.decentraland.org/lambdas/profiles/${a?.publicKey}`
  );
  const json = await res.json();
  const av = json.avatars[0].avatar as any;
  const index = (av.wearables as string[]).indexOf(
    "urn:decentraland:ethereum:collections-v1:community_contest:cw_monocle_eyewear"
  );
  if (index != -1)
    av.wearables[index] =
      "urn:decentraland:matic:collections-v2:0xd2cac686408dd87f615813ac5816ac52a52eb9c7:0";
  else av.wearables.push(
    `urn:decentraland:matic:collections-v2:0xd2cac686408dd87f615813ac5816ac52a52eb9c7:0`
  );
  avatarShape.bodyShape = av.bodyShape;
  avatarShape.skinColor = new Color4(
    av.skin.color.r,
    av.skin.color.g,
    av.skin.color.b,
    1
  );
  avatarShape.eyeColor = new Color4(
    av.eyes.color.r,
    av.eyes.color.g,
    av.eyes.color.b,
    1
  );
  avatarShape.hairColor = new Color4(
    av.hair.color.r,
    av.hair.color.g,
    av.hair.color.b,
    1
  );
  avatarShape.wearables = av.wearables;
  avatarShape.name = "Glasses";
});
