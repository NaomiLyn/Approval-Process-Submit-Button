var __sfdcSessionId = '{!GETSESSIONID()}'; 
{!requireScript("/soap/ajax/22.0/connection.js")} 
{!requirescript("/soap/ajax/20.0/apex.js")} 
{!requirescript("/support/console/28.0/integration.js")} 


if('{!Consulting_Activities__c.Activity_Status__c}'!='Pending Approval'){ 
var activityId ='{!Consulting_Activities__c.Id}'; 
//var optyAmount ='{!Consulting_Activities__c.Opportunity_Value__c}'; 
var optyAmount=''; 

if('{!Consulting_Activities__c.RecordType}'=='Contract' && '{!Consulting_Activities__c.Sub_Activity__c}'=='Sub-Contractor Task Order (STO)'){ 
optyAmount='{!Consulting_Activities__c.STO_Cost__c}'; 
}else if('{!Consulting_Activities__c.RecordType}'=='Contract' && '{!Consulting_Activities__c.Sub_Activity__c}'=='Service Confirmation Order (SCO)'){ 
optyAmount='{!Consulting_Activities__c.SCO_Revenue__c}'; 
}else if('{!Consulting_Activities__c.RecordType}'=='Change Order'){ 
optyAmount='{!Consulting_Activities__c.Change_Order_Value__c}'; 
}else{ 
optyAmount ='{!Consulting_Activities__c.Opportunity_Value__c}'; 
} 
var geo ='{!Consulting_Activities__c.GEO__c}'; 
var methodo = '{!Consulting_Activities__c.Standard_Non_Standard_Response__c}'; 
var chg = '{!Consulting_Activities__c.Change_Order_Modify_Scope_Cost_or_Price__c}'; 
var isApprovedproposal ='{!Consulting_Activities__c.Is_Proposal_Approved__c}'; 

var validationError = sforce.apex.execute("P2C_ConsultingAcitivitiesTriggerHandler","checkApprovalValidations", {activityId:"{!Consulting_Activities__c.Id}", recordTypeName:"{!Consulting_Activities__c.RecordType}"}); 

if(validationError != ''){ 
window.alert(validationError); 
}else{ 
//var result ='Validations passed'; 
var result= sforce.apex.execute("P2C_ConsultingAcitivitiesTriggerHandler","callApproval",{recordId:activityId,dealSize:optyAmount,geo:geo,methodoloy:methodo,CoModifyScope:chg,proposalApproveStatus:isApprovedproposal}); 


if (result == 'Success'){ 
location.reload(); 
}else{ 
alert(result); 
} 
} 
} 
else{ 
alert('Cannot submit an activity which is in Pending Approval status'); 
} 

if ('{!Consulting_Activities__c.Standard_Non_Standard_Response__c}'=='Non Standard' && 
'{!NOT ISPICKVAL(Opportunity.DRB_Approval_Status__c, 'Approved - Email')}' || 
'{!NOT ISPICKVAL(Opportunity.DRB_Approval_Status__c, 'Approved - Meeting')}') 
{alert ("This deal is non-standard and will require Corporate DRB approval. Please engage with Deal Desk")};