import env from 'dotenv'
import { jest } from '@jest/globals'
import 'jest-matcher-one-of'

env.config()
jest.setTimeout(15000)
jest.useFakeTimers()
