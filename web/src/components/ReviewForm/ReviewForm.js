import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ReviewForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.review?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>
        <TextField
          name="body"
          defaultValue={props.review?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="body" className="rw-field-error" />

        <Label
          name="tags"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tags
        </Label>
        <TextField
          name="tags"
          defaultValue={props.review?.tags}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tags" className="rw-field-error" />

        <Label
          name="authorEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author email
        </Label>
        <TextField
          name="authorEmail"
          defaultValue={props.review?.authorEmail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="authorEmail" className="rw-field-error" />

        <Label
          name="salary"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salary
        </Label>
        <NumberField
          name="salary"
          defaultValue={props.review?.salary}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="salary" className="rw-field-error" />

        <Label
          name="salaryCurrency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salary currency
        </Label>
        <TextField
          name="salaryCurrency"
          defaultValue={props.review?.salaryCurrency}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="salaryCurrency" className="rw-field-error" />

        <Label
          name="overallRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Overall rating
        </Label>
        <NumberField
          name="overallRating"
          defaultValue={props.review?.overallRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="overallRating" className="rw-field-error" />

        <Label
          name="learningMentorshipRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Learning mentorship rating
        </Label>
        <NumberField
          name="learningMentorshipRating"
          defaultValue={props.review?.learningMentorshipRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError
          name="learningMentorshipRating"
          className="rw-field-error"
        />

        <Label
          name="meaningfulWorkRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Meaningful work rating
        </Label>
        <NumberField
          name="meaningfulWorkRating"
          defaultValue={props.review?.meaningfulWorkRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="meaningfulWorkRating" className="rw-field-error" />

        <Label
          name="workLifeBalanceRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Work life balance rating
        </Label>
        <NumberField
          name="workLifeBalanceRating"
          defaultValue={props.review?.workLifeBalanceRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="workLifeBalanceRating" className="rw-field-error" />

        <Label
          name="isVerified"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is verified
        </Label>
        <CheckboxField
          name="isVerified"
          defaultChecked={props.review?.isVerified}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="isVerified" className="rw-field-error" />

        <Label
          name="isLegacy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is legacy
        </Label>
        <CheckboxField
          name="isLegacy"
          defaultChecked={props.review?.isLegacy}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="isLegacy" className="rw-field-error" />

        <Label
          name="companyId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Company id
        </Label>
        <NumberField
          name="companyId"
          defaultValue={props.review?.companyId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="companyId" className="rw-field-error" />

        <Label
          name="jobId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Job id
        </Label>
        <NumberField
          name="jobId"
          defaultValue={props.review?.jobId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="jobId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReviewForm
