# Tests

Collection of integration and acceptance tests etc.

## Run tests for data backend

``` bash
cd tests/odyquest-data-backend
sudo docker-compose up --abort-on-container-exit
# As `--exit-code-from` does not work, get the exit code by using
sudo docker inspect test-script --format='{{.State.ExitCode}}'
```

