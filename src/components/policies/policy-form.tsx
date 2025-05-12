"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import type { Policy } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const policyFormSchema = z.object({
  ownerUid: z.string().min(1, "Customer ID is required."),
  vehicleId: z.string().min(1, "Vehicle ID is required."),
  type: z.enum(["Comprehensive", "ThirdParty"], {
    required_error: "Policy type is required.",
  }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  totalPrice: z.coerce.number().min(0, "Total price must be a positive number."),
  pdfFile: z.instanceof(File).optional(),
});

type PolicyFormValues = z.infer<typeof policyFormSchema>;

interface PolicyFormProps {
  initialData?: Policy | null;
  onSubmitSuccess?: () => void;
}

// Sample data for dropdowns
const sampleCustomers = [{ id: "CUST001", name: "Ali Baba" }, { id: "CUST002", name: "Siti Nurhaliza" }];
const sampleVehicles = [{ id: "VEH001", plate: "WWW 123 (Toyota Vios)" }, { id: "VEH002", plate: "JJJ 456 (Honda City)" }];


export function PolicyForm({ initialData, onSubmitSuccess }: PolicyFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(initialData?.pdfUrl ? "Existing PDF" : null);


  const defaultValues = initialData
    ? {
        ...initialData,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate),
        // pdfFile: undefined, // PDF is handled separately
      }
    : {
        ownerUid: "",
        vehicleId: "",
        type: undefined,
        startDate: undefined,
        endDate: undefined,
        totalPrice: 0,
        pdfFile: undefined,
      };

  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: defaultValues as PolicyFormValues, // Type assertion might be needed if initialData structure is slightly different
  });

  function onSubmit(data: PolicyFormValues) {
    console.log("Policy form submitted:", data);
    // Placeholder for actual submission logic (e.g., API call)
    toast({
      title: initialData ? "Policy Updated" : "Policy Created",
      description: `Policy ${initialData ? initialData.id : "new"} has been successfully ${initialData ? "updated" : "created"}. (Simulated)`,
    });
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push("/policies");
    }
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("pdfFile", file);
      setSelectedFileName(file.name);
    } else {
      form.setValue("pdfFile", undefined);
      setSelectedFileName(null);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="ownerUid"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {sampleCustomers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Vehicle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {sampleVehicles.map(vehicle => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>{vehicle.plate}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="ThirdParty">Third Party</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date < new Date("1900-01-01") 
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date < (form.getValues("startDate") || new Date("1900-01-01"))
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Price (RM)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 1200.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdfFile"
          render={() => ( // field is not directly used here for input type="file"
            <FormItem>
              <FormLabel>Policy Document (PDF)</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                    <Input
                        id="pdfFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="pdfFile"
                        className={cn(
                            "flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-md cursor-pointer",
                            "border-input hover:border-primary focus-visible:border-primary",
                            "bg-background hover:bg-accent/50"
                        )}
                    >
                        <UploadCloud className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                        {selectedFileName || "Click to upload or drag and drop PDF"}
                        </span>
                    </label>
                </div>
              </FormControl>
              <FormDescription>
                Upload the policy document in PDF format. Max 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : (initialData ? "Save Changes" : "Create Policy")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
