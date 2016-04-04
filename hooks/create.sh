if [ -f .git/hooks/pre-commit ]; then
  ln -s hooks/pre-commit .git/hooks/pre-commit
fi
