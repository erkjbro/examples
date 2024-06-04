CMD = 'terraform'
ARGS =

.PHONY .SILENT: init
init:
	$(CMD) $(ARGS) init

.PHONY .SILENT: get
get:
	$(CMD) $(ARGS) get --update=true

.PHONY .SILENT: validate
validate:
	$(CMD) $(ARGS) validate

.PHONY .SILENT: plan
plan:
	$(CMD) $(ARGS) plan

.PHONY .SILENT: apply
apply:
	$(CMD) $(ARGS) apply

.PHONY .SILENT: destroy
destroy:
	$(CMD) $(ARS) destroy
