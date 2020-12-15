let psqlCommonErrorCodes = {
  '08003': 'connection_does_not_exist',
  '08006': 'connection_failure',
  '2F002': 'modifying_sql_data_not_permitted',
  '57P03': 'cannot_connect_now',
  '42601': 'syntax_error',
  '42501': 'insufficient_privilege',
  '42602': 'invalid_name',
  '42622': 'name_too_long',
  '42939': 'reserved_name',
  '42703': 'undefined_column',
  '42000': 'syntax_error_or_access_rule_violation',
  '42P01': 'undefined_table',
  '42P02': 'undefined_parameter'
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  console.log('Error caught by error handler', error.message, error.code)

  if(psqlCommonErrorCodes[error.code] !== undefined) {
    return response.status(400).json({ message: `Error caught in postgres ${error.message}`, code: error.code })
  } else {
    return response.status(400).json( { message: `Error name: ${error.name} / Message: ${error.message}` })
  }

}

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}