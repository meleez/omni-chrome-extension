if [ ! -L .git/hooks/pre-commit ]; then
  echo Creating symlink to pre-commit hook.
  ln -s ../../hooks/pre-commit .git/hooks/pre-commit
fi
