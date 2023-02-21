const exitWithError = (message = "Oops. Something went wrong.", code = 1) => {
  console.error(message)

  process.exit(code)
}

export const exitInvalidCommand = (message = "Invalid command") =>
  exitWithError(message, 1)

export const exitNotFound = (message = "No such todo") =>
  exitWithError(message, 2)

export default exitWithError
