let
  devops = builtins.fetchGit {
    url = "ssh://git@github.com/fysiweb/devops";
    rev = "f7a9f0790e847027026d14c64a40d7d8380f9041";
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
