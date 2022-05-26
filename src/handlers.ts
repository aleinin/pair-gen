import { RequestHandler, Response } from 'express'
import { isValidCombinations } from './combinations'
import { generatePairs } from './generatePairs'
import { Pair } from './models/pair'
import { isRequest, Request } from './models/request'

export const isValidRequest: RequestHandler = (req, res, next) => {
  if (isRequest(req.body)) {
    next()
  } else {
    res.status(400)
    res.json({ message: 'Invalid Request' })
  }
}

export const isValidExcludedPairs: RequestHandler = (req, res, next) => {
  const request: Request = req.body
  const excludedPairs: Pair[] = request.excludedPairs
  if (isValidCombinations(excludedPairs)) {
    next()
  } else {
    res.status(400)
    res.json({ message: 'Invalid Excluded Pairs' })
  }
}

export const handleGeneratePairs: RequestHandler = (req, res, next) => {
  const request: Request = req.body
  try {
    const pairs = generatePairs(
      request.teamMembers,
      request.excludedTeamMembers,
      request.excludedPairs
    )
    res.status(200)
    res.json(pairs)
  } catch (e) {
    res.status(500)
    res.json({ message: 'Processing timed out!' })
  }
}
