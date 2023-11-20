{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs std;
  l = nixpkgs.lib // builtins;
in {
  conform = std.std.nixago.conform {
    configData = {
      commit = {
        header = {length = 89;};
        conventional = {
          types = [
            "build"
            "chore"
            "ci"
            "docs"
            "feat"
            "fix"
            "perf"
            "refactor"
            "style"
            "test"
          ];
          scopes = [
            "artifacts"
            "devshell"
            "jormungandr"
            "voting-center-backend"
            "voting-center-dreps"
            "voting-center-frontend"
            "voting-center-strapi"
          ];
        };
      };
    };
  };
  lefthook = std.std.nixago.lefthook {
    configData = {
      pre-commit = {
        commands = {
          treefmt = {
            run = "${nixpkgs.treefmt}/bin/treefmt --fail-on-change {staged_files}";
          };
        };
      };
    };
  };
  prettier =
    std.lib.dev.mkNixago
    {
      configData = {
        printWidth = 80;
        proseWrap = "always";
      };
      output = ".prettierrc";
      format = "json";
      packages = with nixpkgs; [nodePackages.prettier];
    };
  treefmt =
    std.std.nixago.treefmt
    {
      configData = {
        formatter = {
          nix = {
            command = "alejandra";
            includes = ["*.nix"];
          };
          prettier = {
            command = "prettier";
            options = ["--write"];
            includes = [
              "*.md"
            ];
          };
        };
      };
      packages = with nixpkgs; [alejandra];
    };
}
