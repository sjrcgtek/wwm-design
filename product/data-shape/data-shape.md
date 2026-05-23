# Data Shape

## Entities

### Need
A specific item on the ministry's needs list. Includes a name, description, quantity needed, and optional brand or store preference. A Need may be fully claimed, partially claimed, or still open.

### Commitment
A donor's pledge to provide a specific Need. Captures the donor's name, email, quantity they are providing, and when the commitment was made. A single Need may have multiple Commitments if the quantity is greater than one.

### Coordinator
The ministry administrator who manages the Needs list and receives notifications when Commitments are made.

## Relationships

- Need has many Commitments
- Commitment belongs to a Need
- Coordinator manages all Needs and Commitments
