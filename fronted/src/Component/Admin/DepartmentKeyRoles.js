import React from 'react'

const DepartmentKeyRoles = ({ handlechange, departmentval }) => {

    return (
        <div style={{ width: '100%' }}>
            <label>Job Position</label>
            {
                departmentval === 'Management & Leadership Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Founder / Director">Founder / Director</option>
                    <option value="Business Head">Business Head</option>
                </select> : departmentval === 'Sales & Business Development Department' ? <select name='department' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Admission Counsellors">Admission Counsellors</option>
                    <option value="Telesales Executives">Telesales Executives</option>
                    <option value="Freelancer Coordinators">Freelancer Coordinators</option>
                </select> : departmentval === 'Telesales & Admission Counselling Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Admission Counsellors">Admission Counsellors</option>
                    <option value="Telesales Executives">Telesales Executives</option>
                    <option value="Freelancer Coordinators">Freelancer Coordinators</option>
                </select> : departmentval === 'Admission Backend & Operations Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Admission Coordinators">Admission Coordinators</option>
                    <option value="Documentation & Verification Executives">Documentation & Verification Executives</option>
                    <option value="University Coordination Executives">University Coordination Executives</option>
                </select> : departmentval === 'Training, Quality & Compliance Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Training Managers">Training Managers</option>
                    <option value="Quality Analysts">Quality Analysts</option>
                    <option value="Compliance Officers">Compliance Officers</option>
                </select> : departmentval === 'CRM, IT & Technology Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="CRM Administrators">CRM Administrators</option>
                    <option value="IT Support Executives">IT Support Executives</option>
                    <option value="Data Managers">Data Managers</option>
                </select> : departmentval === 'Finance, Accounts & Payout Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Accounts Manager">Accounts Manager</option>
                    <option value="Finance Executives">Finance Executives</option>
                    <option value="Payout Coordinators">Payout Coordinators</option>
                </select> : departmentval === 'Human Resources (HR) Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Recruiters">Recruiters</option>
                    <option value="HR Coordinators">HR Coordinators</option>
                </select> : departmentval === 'Marketing, Branding & Communication Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Legal Advisors">Legal Advisors</option>
                    <option value="Documentation Officers">Documentation Officers</option>
                </select> : departmentval === 'Legal, Documentation & Compliance Department' ? <select name='jobposition' onChange={handlechange}>
                    <option value="">Select Role</option>
                    <option value="Legal Advisors">Legal Advisors</option>
                    <option value="Documentation Officers">Documentation Officers</option>
                </select> : <select>
                    <option value="">Select Department First</option>
                </select>
            }
        </div>
    )
}

export default DepartmentKeyRoles
