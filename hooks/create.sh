if [ ! -L .git/hooks/pre-commit ]; then
  echo Creating symlink to pre-commit hook.
  rm .git/hooks/pre-commit.sample
  ln -s ../../hooks/pre-commit .git/hooks/pre-commit
fi
