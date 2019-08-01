#!/bin/sh

echo "\e[34mBuilding...\e[0m"
./tools/gup compile -v || $(echo 'Build failed...' ; exit 1)

if [ -d ~/.local/share/gnome-shell/extensions/slinger@gfxmonk.net ] ; then
    echo "\e[33mUninstalling previous version...\e[0m"
    rm -Rfv ~/.local/share/gnome-shell/extensions/slinger@gfxmonk.net
fi

echo "\e[34mInstalling...\e[0m"

mkdir -p ~/.local/share/gnome-shell/extensions/slinger@gfxmonk.net/schemas
cp  --verbose $PWD/extension/*.* ~/.local/share/gnome-shell/extensions/slinger@gfxmonk.net/
cp  --dereference --verbose $PWD/extension/schemas/*.* ~/.local/share/gnome-shell/extensions/slinger@gfxmonk.net/schemas/

echo "\e[32mDone. Activate using application 'Gnome Tweaks'.\e[0m"
