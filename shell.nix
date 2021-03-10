let
  devops = builtins.fetchGit {
    url = "ssh://git@github.com/fysiweb/devops";
    rev = "44b1d6c9dd6b8710a75f07fbe73acd3380025abd";
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
