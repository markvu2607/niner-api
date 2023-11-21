import { resolve } from "path"

export default {
  input: resolve(__dirname, "./server.ts"),
  output: {
    file: resolve(__dirname, "dist/server.bundle.js"),
    format: "cjs",
  },
  external: ["express"],
  plugins: [
    rollup({
      treeshake: true,
    }),
  ],
}
