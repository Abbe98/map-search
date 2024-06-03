@_default:
    just --list

build:
    npm run build

server:
    npm run serve

audit-fix:
    npm audit fix
