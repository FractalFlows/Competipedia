import { Meteor } from 'meteor/meteor'

import './sendEmail'
import './setCategories'
import './requestCompetitor'
import './addCompetitor'
import './addValidatorUser'
import './confirmValidatorUser'
import './denyValidatorUser'
import './confirmNewCompany'
import './denyNewCompany'

if(Meteor.settings.public.env !== 'development') return
import './dev'
