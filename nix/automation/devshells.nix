{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs std;
  inherit (inputs.cells.lib.toolchains) nodejs;
  l = nixpkgs.lib // builtins;

  mkEnv = env: l.mapAttrsToList (name: value: {inherit name value;}) env;

  catalystWorld = {...}: {
    name = nixpkgs.lib.mkForce "Governance Voting Center";
    nixago = [
      cell.configs.lefthook
      cell.configs.prettier
      cell.configs.treefmt
    ];
    packages = with nixpkgs; [
      nodejs
      prefetch-npm-deps
    ];
  };
in
  l.mapAttrs (_: std.lib.dev.mkShell) {
    dev = {...}: {
      imports = [
        catalystWorld
      ];
      packages = [];
      commands = [];
    };
    ops = {...}: {
      imports = [
        catalystWorld
      ];
      commands = [];
    };
  }
