{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
in {
  nodejs = nixpkgs.nodejs-16_x;
}
