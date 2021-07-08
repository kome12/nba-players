import { PlayerCreateInput, PlayerUpdateInput } from "../src/models";
import { Context } from "./test-context";

export async function createPlayer(player: PlayerCreateInput, ctx: Context) {
  return await ctx.prisma.player.create({
    data: player,
  });
}

export async function updatePlayer(
  id: number,
  player: PlayerUpdateInput,
  ctx: Context
) {
  return await ctx.prisma.player.update({
    where: { id },
    data: player,
  });
}
