import env from 'dotenv'
import { jest } from '@jest/globals'
import 'jest-matcher-one-of'

env.config()
jest.useFakeTimers()
jest.setTimeout(15000)
