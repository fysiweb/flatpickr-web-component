let
  devops = builtins.fetchGit {
    url = "ssh://git@github.com/fysiweb/devops";
    rev = "b8653783e9698cf6e174751751f748e20595a694";
  };
  pkgs = import <nixpkgs> {
    overlays = [
      (import "${devops}/pkgs")
    ];
  };
in
pkgs.mkShell {
  name = "flatpickr-web-component-shell";

  buildInputs = [
    pkgs.build-component
    pkgs.nodejs
    pkgs.publish-component
  ];

  shellHook = ''
    cd ${toString ./.}
  '';
}
